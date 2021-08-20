# GLFind

## Installation

```bash
npm install glfind -g
```

## Commands

#### Login

Update Gitlab Host and Token information. 

```bash
glfind login
Found Gitlab Host: https://gitlab.com
Found Gitlab Token: ?????

Going to update Gitlab Credential.

× Gitlab Host: ...
× Gitlab Token: ...
Gitlab Credential Updated.
```

### Gitlab Repository Synchronization

Sync the list of repositories hosted in Gitlab with local storage.

```bash
glfind rs
Start Syncing Repositories. Might take some time depending on number of hosted repositories.
Gitlab Repositories Synced.
```

### NPM Package Search

Find the repositories that are using target npm package.

```bash
glfind ps
√ Package Name: ... lodash
√ Use Local Cache of Repositories Records ? ... N / Y
# Searching   269/269 --[████████████████████████████████████████████████████████████████████████████████████████████████████]--

Repositories that depending on package 'lodash':
aaa
bbb
ccc
ddd
```
