// Variáveis de seleção dos elementos(botões).
const sobreMim = document.getElementById("sobre-mim");
const formacao = document.getElementById("formacao");
const portifolio = document.getElementById("portifolio");
const contato = document.getElementById("contato");
const title = document.getElementById("title")
const repositories = document.querySelector('.repos')


//Funções

//Esconde todas as divs que estiverem visíveis (para não precisar adivinhar qual menu está selecionado)
function esconder(cl) {
    const articles = document.querySelectorAll(cl)//Lista de elementos obtidos através do query selector
    console.log(articles)
    for ( var article of articles)
        if (article.style.display != 'none')
            article.style.display = 'none';
}

//Mostra
function mostrar(id) {
    var element = document.getElementById(id)
    if (element.style.display == 'none')
        element.style.display = 'flex';
}

function showSobreMim() {
    esconder('.article-content')
    mostrar('descricao-lista')
    sobreMim.onclick = null
    title.innerHTML = "Sobre Mim"
    formacao.setAttribute('onclick','showFormacao()')
    portifolio.setAttribute('onclick','showPortifolio()')
    contato.setAttribute('onclick','showContato()')
}


function showFormacao() {
    esconder('.article-content')
    mostrar('formacao-content')
    sobreMim.setAttribute('onclick','showSobreMim()')
    portifolio.setAttribute('onclick','showPortifolio()')
    contato.setAttribute('onclick','showContato()')
    title.innerHTML = "Formação"
    formacao.onclick = null
}

async function getApiGitHub() {
    fetch('https://api.github.com/users/Werricsson-Santos/repos')
        .then(async res=> {
            if(!res.ok) {
                throw new Error(res.status);
            }

            let data = await res.json();
            

            // Ordenar os resultados com base em res.language
            data.sort((a,b) => {
                // Coloca os itens com res.language !== null no início
                if (a.language !== null && b.language === null) {
                    return -1;
                } else if (a.language === null && b.language !== null) {
                    return 1;
                } else {
                    return 0;
                }
            });



            console.log(data)
            data.map( item => {
                let project = document.createElement('div');


                project.innerHTML = `
                <div class="project">
                    <div>
                        <h4 class="title">${ item.name }</h4>
                        <span class="date-create">${ Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at)) }</span>
                    </div>
                    <div>
                        <div class="link-container">
                            <a href="${ item.html_url }" target="_blank"><span>${ item.html_url }</span></a>
                        </div>
                        <span class="language" style="${item.language === null ? 'color: #8b949e;' : ''}">
                            <span class="circle" 
                            style="${
                                    item.language === 'HTML' ? 'background-color: #e34c26;' : 
                                    item.language === 'JavaScript' ? 'background-color: #f1e05a;' :
                                    item.language === 'Python' ? 'background-color: #3572A5;' : 
                                    item.language === 'TypeScript' ? 'background-color: #3178c6' :
                                    item.language === 'Shell' ? 'background-color: #89e051' :
                                    item.language === 'CSS' ? 'background-color: #563d7c' : 
                                    'display: none;'
                                }"> 
                        </span>
                            ${  item.language === null ?  'Atualizado em ' + Intl.DateTimeFormat('pt-BR').format(new Date(item.updated_at)) : item.language}
                        </span>
                    </div>
                </div>
                `

                repositories.appendChild(project);
            })
        })
}


function showPortifolio() {
    esconder('.article-content')
    mostrar('portifolio-content')
    sobreMim.setAttribute('onclick','showSobreMim()')
    formacao.setAttribute('onclick','showFormacao()')
    contato.setAttribute('onclick','showContato()')
    title.innerHTML = "Portifólio"
    portifolio.onclick = null
    if (typeof mostrar === 'function') {
        getApiGitHub();
    }
    
}

function showContato() {
    esconder('.article-content')
    mostrar('contato-content')
    sobreMim.setAttribute('onclick','showSobreMim()')
    formacao.setAttribute('onclick','showFormacao()')
    portifolio.setAttribute('onclick','showPortifolio()')
    title.innerHTML = "Contato"
    contato.onclick = null    
}


