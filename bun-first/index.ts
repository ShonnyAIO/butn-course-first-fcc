import figlet from 'figlet';

const server = Bun.serve({
    port: 3000,
    fetch(req){
        const url = new URL(req.url);

        if(url.pathname === '/'){
            const body = figlet.textSync("I am learning Bun from FCC !");
            return new Response(body);
        }

        if(url.pathname === '/about'){
            return new Response("About Me!");
        }

        if(url.pathname === '/contact'){
            return new Response("Contact us!");
        }

        // handle error
        if(url.pathname === '/feed'){
            throw new Error('Could not fetch feed');
        }

        if(url.pathname === '/greet'){
            return new Response(Bun.file('./greet.txt'));
        }

        return new Response('404!');
    },

    error(error){
        return new Response(`<pre> ${error} \n ${error.stack} </pre>`, {
            headers : {
                'Content-Type' : 'text/html'
            }
        });
    }
});

console.log(`LISTENING ON PORT http://localhost:${server.port}`);