# GIT

It's a distributed `VCS` system to manage and track the files changed. This guide is based on the information availalble at the [git tutorial][1].

A very good interactive tutorial for git is available at [learn git branching][2].


It uses a three-tier architecture with each tier as follows:

1. Working tree, i.e., working directory
2. Index, i.e., staging area
3. Repository

## Working Tree
This consists of the current files we are working on and this is where we do all our regular daily tasks like:

- Add new files
- Edit files
- Delete files

Here the files are not yet tracked by `git` untill they are added to the `staging area` or `index` as discussed next. Any change made is considered as **untracked** until it is explicitly added to the next layer.

## Index
The `index` or the `Staging area`, is where commits are prepared. Once staged, the files from the working tree are compared to those in the repo. Changes to files in the working tree are marked as modified before committing them.

The layer allows one to perform below:

    >1. Review changes before committing
    >2. Selectively stage parts of files

The `staging area` ensures that only the changes we want to include are committed.

## Repository

The `Repository` or the `repo` is the final layer where the history of our project is stored and all changes to the project files are tracked. It contains all `commits`, `branches`, `tags` and `metadata`.

This layer provides:

    >1. A complete history of changes
    >2. The ability to collaborate with others
    >3. Version tracking and branching capabilities

When we commit changes, they are moved from the `index` to the `repository`. Each commit in the `repository` represents a snapshot of the project at a given point in time.

```sh
{Working Tree}      =>      {Index}     =>      {Repository}
                (Register)            (Commit)
```

`git` is a software and `guthub` is a service.

The current version of `git` client can be obtained by using either `git -v` or `git --version` as shown below:

```bash
λ git --version
git version 2.39.5 (Apple Git-154)
```

# A highlievel view of Git workflow
At a very high level, any `git` project goes through the below phases:

1. Modify your files in the working tree.
2. Stage the changes you want to include in the next commit.
3. Commit your changes.

A detailed breakup of this workflow has below steps:

- Initialize a repository
- Work on your files
- Stage changes
- Commit changes
- Review history
- Branching
- Merge changes
- Push and pull from remote


## Initialize a new git repository
To initialize a project to be tracked by `git` run `git init` inside it. It has to be run only once inside the project folder to be tracked.

```bash
~sw λ mkdir git-staging-lab
~/sw λ cd git-staging-lab
~/sw/git-staging-lab λ git init
Initialized empty Git repository in /Users/sampathsingamsetty/sw/git-staging-lab/.git/
Initialized empty Git repository in /Users/sampathsingamsetty/sw/web/.git/

# a new folder .git will be created
~/sw/git-staging-lab on main λ ls -a
.    ..   .git
```

The status of the repository can now be viewed using `git status` command
```bash
~/sw/git-staging-lab on main λ git status
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
```

# Adding Files to the Staging Area
Now that a staging area has been created, we can create new files and add to the staging area.

The workflow goes like this
```sh
{Write}     =>  {Add}   =>  {Commit}
```

A file can be any of the below 3 states:

> - Modified
> - Staged
> - Committed

```bash
~/sw/git-staging-lab on main λ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        testone.txt
        testtwo.txt

nothing added to commit but untracked files present (use "git add" to track)
```

Now add one of the files to staging:
```sh
~/sw/git-staging-lab on main ● λ git add testone.txt
```
If we observe the `status` now:
```sh
~/sw/git-staging-lab on main ● ● λ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   testone.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        testtwo.txt
```

We now have a mixture of `tracked` and `untracked` files.
If we `add` the `tracked` file for `staging`:
```bash
~/sw/git-staging-lab on main ● ● λ git commit -m "add file one"
[main (root-commit) f577dae] add file one
 Committer: Sampath Singamsetty <sampathsingamsetty@Sampaths-MacBook-Pro.local>
Your name and email address were configured automatically based
on your username and hostname. Please check that they are accurate.
You can suppress this message by setting them explicitly:

    git config --global user.name "Your Name"
    git config --global user.email you@example.com

After doing this, you may fix the identity used for this commit with:

    git commit --amend --reset-author

 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 testone.txt
```

Let's add the other file also to `tracking`
```bash
~/sw/git-staging-lab on main ● λ git add testtwo.txt
~/sw/git-staging-lab on main ● λ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   testtwo.txt


# Commit the second one as well
~/sw/git-staging-lab on main λ git commit
~/sw/git-staging-lab on main λ git status
On branch main
nothing to commit, working tree clean
```
Additional `commit` information is available by using `git log` command
```sh
~/sw/git-staging-lab on main λ git log
commit 476200628a2e0b049d10593a632da2b3b23a2b95 (HEAD -> main)
Author: Sampath Singamsetty <sampathsingamsetty@Sampaths-MacBook-Pro.local>
Date:   Sat Jan 11 20:26:22 2025 -0600

    add second file to the code base

commit f577dae46ac20349519ed8419a303148afbaf015
Author: Sampath Singamsetty <sampathsingamsetty@Sampaths-MacBook-Pro.local>
Date:   Sat Jan 11 20:17:40 2025 -0600

    add file one
```

Adding few more files and then created a `.gitignore` file to not include `.env` and `node_modules/` into repository for tracking:
```sh
~/sw/git-staging-lab on main ● λ git status
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        testfour.txt
        testthree.txt

nothing added to commit but untracked files present (use "git add" to track)

# now add all the files and check status
~/sw/git-staging-lab on main ● λ git add .
~/sw/git-staging-lab on main ● λ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitignore
        new file:   testfour.txt
        new file:   testthree.txt
```


# Working on branches

```bash
λ cd git-advanced-lab
~/sw/git-advanced-lab λ git status
fatal: not a git repository (or any of the parent directories): .git
~/sw/git-advanced-lab λ git init
Initialized empty Git repository in /Users/sampathsingamsetty/sw/git-advanced-lab/.git/
~/sw/git-advanced-lab on main λ git status
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)

# Create a new file index.html
~/sw/git-advanced-lab on main λ touch index.html
~/sw/git-advanced-lab on main λ git status
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	index.html

nothing added to commit but untracked files present (use "git add" to track)
~/sw/git-advanced-lab on main ● λ git add index.html
~/sw/git-advanced-lab on main ● λ git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   index.html

~/sw/git-advanced-lab on main ● λ git commit -m "add index file"
[main (root-commit) 8458de8] add index file
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 index.html
```
Now, updating any file will mark the file as a probable candidate to be included into the timeline.

```sh
# updated the index.html and now check git status
~/sw/git-advanced-lab on main λ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")
```

Add the file to track and commit with a message:
```bash
~/sw/git-advanced-lab on main ● λ git add index.html
~/sw/git-advanced-lab on main ● λ git commit -m "updated the index file with title and body"
[main 60e3bd7] updated the index file with title and body
 1 file changed, 11 insertions(+)
~/sw/git-advanced-lab on main λ git status
On branch main
nothing to commit, working tree clean
```

## Branching
Branching allows developers to branch out from the original code base and isolate their work from others.
It also helps Git to merge versions later on easily.

Changes in the primary or other branches will not affect your branch unless you pull the latest changes from those branches.

Create a new branch `nav-bar`:
```sh
~/sw/git-advanced-lab on main λ # Create a branch
~/sw/git-advanced-lab on main λ git branch nav-bar
~/sw/git-advanced-lab on main λ git branch

* main
  nav-bar
```

The `*` before `main` indicates that the branch is still pointing to `main`. We can switch to different branch using the `git checkout` command

```bash
~/sw/git-advanced-lab with .virtualenv on main λ git checkout nav-bar
Switched to branch 'nav-bar'

~/sw/git-advanced-lab with .virtualenv on nav-bar λ git branch
  main
* nav-bar
```

Create and update a new file in the `nav-bar` branch now:
```bash
~/sw/git-advanced-lab with .virtualenv on nav-bar λ touch nav-bar.html
~/sw/git-advanced-lab with .virtualenv on nav-bar λ git status
On branch nav-bar
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        nav-bar.html

nothing added to commit but untracked files present (use "git add" to track)
~/sw/git-advanced-lab with .virtualenv on nav-bar ● λ git add nav-bar.html
~/sw/git-advanced-lab with .virtualenv on nav-bar ● λ git commit -m "add nav-bar to the code base"
[nav-bar 987c94f] add nav-bar to the code base
 1 file changed, 7 insertions(+)
 create mode 100644 nav-bar.html
```

Now merge `nav-bar` branch with `main`:
```sh
# Switch to the main branch first
~/sw/git-advanced-lab with .virtualenv on main λ git checkout main
~/sw/git-advanced-lab with .virtualenv on nav-bar λ git branch
* main
  nav-bar

# now merge
~/sw/git-advanced-lab on main λ git merge nav-bar
Merge made by the 'ort' strategy.
 nav-bar.html | 7 +++++++
 1 file changed, 7 insertions(+)
 create mode 100644 nav-bar.html

# check logs
~/sw/git-advanced-lab on main λ git log --graph --oneline --decorate --all

*   57d3cc3 (HEAD -> main) Merge branch 'nav-bar'
|\
| * 987c94f (nav-bar) add nav-bar to the code base
* | 2fa8172 add hero section to the code base
|/
* 60e3bd7 updated the index file with title and body
* 8458de8 add index file
```

## Delete the branch
Any time a branch may be deleted if not required:
```sh
# Delete the branch
~/sw/git-advanced-lab on main λ # Delete a branch
~/sw/git-advanced-lab on main λ git branch -d nav-bar
Deleted branch nav-bar (was 987c94f).
```

Now create a new branch and switch to it:
```sh
~/sw/git-advanced-lab on main λ # create a new branch and swicth to it
~/sw/git-advanced-lab on main λ git checkout -b footer
Switched to a new branch 'footer'

~/sw/git-advanced-lab on main λ git branch
* footer
  main

# create a new file footer.html and commit it
~/sw/git-advanced-lab on footer λ nvim footer.html
~/sw/git-advanced-lab on footer ● ● λ git add footer.html
~/sw/git-advanced-lab on footer λ git commit -m "add footer section to the code base"
[footer 117f804] add footer section to the code base
 1 file changed, 3 insertions(+)
 create mode 100644 footer.html

nothing added to commit but untracked files present (use "git add" to track)

# Switch to main and merge
~/sw/git-advanced-lab on footer ● λ git checkout main
M	index.html
Switched to branch 'main'

~/sw/git-advanced-lab on main ● λ git merge footer
Updating 57d3cc3..117f804
Fast-forward
 footer.html | 3 +++
 1 file changed, 3 insertions(+)
 create mode 100644 footer.html
```
# Empty commits
Create an empty commit, and then push it up to your repository.

```bash
git commit -m "This is an empty commit " --allow-empty
git push origin main
```

# References:
[1]: https://nulab.com/learn/software-development/git-tutorial/
[2]: https://learngitbranching.js.org/
[3]: http://marklodato.github.io/visual-git-guide
