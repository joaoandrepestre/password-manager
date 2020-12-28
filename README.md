# Password Manager

A password generator and manager. Create random passwords, store them safely and consult them later.

## Instalation

- Clone the repository
```bash
git clone <https url>
```
- Create passwords file in home directory:
 ```bash
 touch .passwords
 ```
 - Add the /scripts directory to path variable in .bashrc
 ```bash
 export PATH=$PATH:<path to repo clone>/password-manager/scripts
 ```
 - Source .bashrc file
 ```bash
 source .bashrc
 ```

 ## Usage
 Run the following command:
 
 ```bash
 passman <command> <key>
 ```

 Where *command* is either **generate** (g) for generating a new password or **password-for** (p) for getting a defined password for the given *key*
