import java.io.*;
import java.net.*;
import java.util.Scanner;

public class ClientTicTacToe {
    static char[][] table = {
        {' ', ' ', ' '},
        {' ', ' ', ' '},
        {' ', ' ', ' '}
    };
    static char currentPlayer = 'O';

    public static void main(String[] args) throws IOException {
        Scanner input = new Scanner(System.in);

        System.out.print("Digite o IP do servidor (ex: 192.168.188.153): ");
        String host = input.nextLine();

        Socket socket = new Socket(host, 5000);
        System.out.println("Conectado ao servidor como jogador O");

        BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

        boolean gameOn = true;

        while (gameOn) {
            if (currentPlayer == 'O') {
                printTable();
                System.out.println("Sua jogada (O). Digite linha e coluna (0-2):");
                int line = input.nextInt();
                int column = input.nextInt();

                if (!isValidMove(line, column)) {
                    System.out.println("Posição inválida. Tente de novo.");
                    continue;
                }

                table[line][column] = 'O';
                out.println(line + "," + column);
            } else {
                System.out.println("Esperando jogada do jogador X...");
                String move = in.readLine();
                String[] parts = move.split(",");
                int line = Integer.parseInt(parts[0]);
                int column = Integer.parseInt(parts[1]);
                table[line][column] = 'X';
            }

            if (victoryVerification()) {
                printTable();
                System.out.println("Jogador " + currentPlayer + " venceu!");
                gameOn = false;
                break;
            } else if (drawVerification()) {
                printTable();
                System.out.println("Empate!");
                gameOn = false;
                break;
            }

            currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        }

        input.close();
        in.close();
        out.close();
        socket.close();
    }

    static boolean isValidMove(int l, int c) {
        return l >= 0 && l < 3 && c >= 0 && c < 3 && table[l][c] == ' ';
    }

    static void printTable() {
        System.out.println("-------------");
        for (int i = 0; i < 3; i++) {
            System.out.print("| ");
            for (int j = 0; j < 3; j++) {
                System.out.print(table[i][j] + " | ");
            }
            System.out.println();
            System.out.println("-------------");
        }
    }

    static boolean victoryVerification() {
        for (int i = 0; i < 3; i++) {
            if (table[i][0] == currentPlayer && table[i][1] == currentPlayer && table[i][2] == currentPlayer)
                return true;
            if (table[0][i] == currentPlayer && table[1][i] == currentPlayer && table[2][i] == currentPlayer)
                return true;
        }

        if (table[0][0] == currentPlayer && table[1][1] == currentPlayer && table[2][2] == currentPlayer)
            return true;
        if (table[0][2] == currentPlayer && table[1][1] == currentPlayer && table[2][0] == currentPlayer)
            return true;

        return false;
    }

    static boolean drawVerification() {
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (table[i][j] == ' ')
                    return false;
        return true;
    }
}
