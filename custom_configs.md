# Para ~/.bashrc

```
function customize_aliases {

	alias ac="ant compile"
	alias acc="ant clean compile"
	alias ad="ant deploy"
	alias af="ant format-source"
	alias afcb="ant format-source-current-branch"

	alias cdm="cd_module"
    alias cdp="cd ~/dev/projects"
	alias cdt="cd ~/dev/projects/liferay-portal"

	alias d="docker"

	alias g="git"
	alias gfpr="git_fetch_pr ${1}"
	alias gg="git_grep"
	alias gi="gpr info"
	alias gpr="~/dev/projects/git-tools/git-pull-request/git-pull-request.sh"

	alias java6="switch_to_java_6"
	alias java7="switch_to_java_7"
	alias java8="switch_to_java_8"
	alias java11="switch_to_java_11"
	alias java17="switch_to_java_17"

	alias la="ls -la -A -h --group-directories-first"
	alias mla="ls -la -A -h --group-directories-first --full-time"
	alias more="more -e"
}

cl() {
	cd "$1" && ls -la -A -h --group-directories-first
}

cdw() {
	cd ~/dev/projects/Watat && ls -la -A -h --group-directories-first
}

function customize_prompt {
	PS1="\[\e]0;\w\a\]\n\[\e[91m\]\A, \d\[\n\e[92m\]\u@\h \[\e[33m\]\w\[\e[0m\] \$(parse_git_current_branch_with_parentheses)\n\$ "
	-->  PROMPT_COMMAND='branch_name=$(git rev-parse --is-inside-work-tree &>/dev/null && git branch --show-current); export PS1="\[\e]0;\w\a\]\n\[\e[91m\]\A, \d\[\n\e[92m\]\u@\h \[\e[33m\]\w\[\e[0m\] \${branch_name:+ ($branch_name)}\n\$ "'
	--> PROMPT_COMMAND='branch_name=$(git rev-parse --is-inside-work-tree &>/dev/null && git branch --show-current); export PS1="\[\033[0;92m\]\u@\h:\w\[\033[0;33m\]${branch_name:+ ($branch_name)}\[\033[0;92m\]\$\[\033[0m\] "'

	
	# other prompts
	#PS1="\[\e]0;\w\a\]\n\[\e[32m\]\u@\h \[\e[33m\]\w\[\e[0m\] \$(parse_git_current_branch_with_parentheses)\n\$ "
	#PS1="\[\e]0;\w\a\]\n\[\e[91m\]\A, \d\[\n\e[92m\]\u@\h \[\e[33m\]\w\[\e[0m\] \$(parse_git_current_branch_with_parentheses)\n\$ "
	#
	# ivisson
	#PROMPT_COMMAND='branch_name=$(git rev-parse --is-inside-work-tree &>/dev/null && git branch --show-current); export PS1="\[\033[0;92m\]\u@\h:\w\[\033[0;33m\]${branch_name:+ ($branch_name)}\[\033[0;92m\]\$\[\033[0m\] "'
	#
	# broken find ip
	#PS1_CMD1='$(ip route get 1.1.1.1 | awk -F"src " '"'"'NR == 1{ split($2, a," ");print a[1]}'"'"')';
	#
	# https://forums.fedoraforum.org/showthread.php?326174-stop-konsole-highlighting-pasted-text
	# https://newbedev.com/remote-ssh-commands-bash-bind-warning-line-editing-not-enabled
	#
	#if [ -t 1 ]
	#then
	#	bind "set enable-bracketed-paste off"
	#fi
}
```

# Para ~/.gitconfig

```
[alias]
	br = branch
	ci = commit
	co = checkout
	cp = cherry-pick
	dc = diff --cached
	df = diff
	lgo = log --oneline
	pl = pull
	pm = push origin master
	rb = rebase
	st = status
[color]
	ui = auto
[core]
	abbrev = 7
	autocrlf = false
	bare = false
	editor = vi
	hideDotFiles = dotGitOnly
	filemode = true
	logallrefupdates = true
	repositoryformatversion = 0
[credential]
	helper = cache --timeout=86400
[filter "lfs"]
	clean = git-lfs clean %f
	required = true
	smudge = git-lfs smudge %f
[gc]
	auto = 0
	autodetach = false
[git-pull-request]
	close-default-comment = Merged. Thank you.
	color-display-title-user = cyan
	color-status = cyan
	fetch-auto-update = true
	update-method = rebase
[merge]
	renameLimit = 1000
[pull]
	rebase = true
[push]
	default = matching
```
