# vue-reserva-campo

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### test

```sh
npm run test
```

## Installation by Docker

1.- You must be installed docker in your system.  
2.- Clone this repository to your local machine.  

```bash
    git clone https://github.com/tu_usuario/repositorio.git
```

3.- Navigate to the project folder.

```bash
    cd repositorio
```

3.1 Adding .env file with the next content


    VITE_APP_TITLE="Reserva Total"
    VITE_APP_AUTHOR_NAME="EscribeSoft"
    VITE_APP_AUTHOR_URL="https://escribesoft.blogspot.com/"
    VITE_API_APPSCRIPT="https://script.google.com/macros/s/xxxzzzz/exec"

    # ANDROID VARIABLES
    VITE_API_BASE_URL_APP="https://script.google.com/macros/s/aaaabbbb/exec"
    # VITE_API_BASE_URL_WEB=""
    VITE_BASE_URL_WEB="https://reservatotal.blogspot.com"
    VITE_USER_DEMO_ID= "1720847377722-6667"


4.- Execute the next command:

```bash
    docker-compose up --build
```

Optional

```bash
    docker-compose stop
    docker-compose start
```

Optional 2 : useful for access to system

```bash
    docker ps # to know the ID-CONTAINER
    docker exec -it <ID-CONTAINER> sh
````




### Preview v1

Release 2023-06-18

* Payment with yape
* API building with appScript
* Validation of name by DNI
* Syncing the 3 components
  * appScript          [backend]
  * application web    [Frontend]
  * application mobile [Frontend]

![v1 reserva de campo](docs/v1-rentando.blogspot.com-iphone-se.png)
