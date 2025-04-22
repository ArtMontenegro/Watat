import java.io.*;
import java.net.*;
import java.util.Scanner;

public class ServerTicTacToe {
    static char[][] table = {
        {' ', ' ', ' '},
        {' ', ' ', ' '},
        {' ', ' ', ' '}
    };
    static char currentPlayer = 'X';

    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(5000);
        System.out.println("Aguardando conexão do jogador O...");
        Socket clientSocket = serverSocket.accept();
        System.out.println("Jogador O conectado!");

        Scanner input = new Scanner(System.in);
        BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true);

        boolean gameOn = true;

        while (gameOn) {
            printTable();

            if (currentPlayer == 'X') {
                System.out.println("Sua jogada (X). Digite linha e coluna (0-2):");
                int line = input.nextInt();
                int column = input.nextInt();

                if (!isValidMove(line, column)) {
                    System.out.println("Posição inválida. Tente de novo.");
                    continue;
                }

                table[line][column] = 'X';
                out.println(line + "," + column); // envia jogada para o cliente
            } else {
                System.out.println("Esperando jogada do jogador O...");
                String move = in.readLine();
                String[] parts = move.split(",");
                int line = Integer.parseInt(parts[0]);
                int column = Integer.parseInt(parts[1]);
                table[line][column] = 'O';
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
        clientSocket.close();
        serverSocket.close();
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
