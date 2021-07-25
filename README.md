# Node JS repo template
Template repo for using by the suite.

## Git

### signing-commits
https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/signing-commits

To configure your Git client to sign commits by default for a local repository, in Git versions 2.0.0 and above, run `git config commit.gpgsign true`.

### checking-for-existing-gpg-keys
https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/checking-for-existing-gpg-keys

Use the `gpg --list-secret-keys --keyid-format LONG` command to list GPG keys for which you have both a public and private key. A private key is required for signing commits or tags.

```
malnati@ctrl:~/git/ty-ti/node-template$ gpg --list-secret-keys --keyid-format LONG
```

### generating-a-new-gpg-key
https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-gpg-key

Generate a GPG key pair. Since there are multiple versions of GPG, you may need to consult the relevant man page to find the appropriate key generation command. Your key must use RSA. If you are on version 2.1.17 or greater, paste the text below to generate a GPG key pair.

Example of process starting.
```
malnati@ctrl:~/git/ty-ti/node-template$ gpg --full-generate-key
gpg (GnuPG) 2.2.19; Copyright (C) 2019 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
  (14) Existing key from card
```
### adding-a-new-gpg-key-to-your-github-account
https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account
