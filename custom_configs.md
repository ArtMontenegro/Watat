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
