// Evento acionado quando html é carregado não esperando por folhas
// de estilo ou imagens.

document.addEventListener("DOMContentLoaded", function() {
  verificaStack();
  manipulaNav("painel", alteraEstado);
  switchItemNav("painel", window.history.state, "#ef914c");
  
  
window.onpopstate = () => {
    if(window.history.state != null) {
        inserirConteudo(ajeitaCaminho(window.history.state));
        switchItemNav("painel", window.history.state, "#ef914c");
     } else {
         window.location.href="/login";   
    }}});

var adapterPaths = {
    "perfil"       : "prestador-perfil",
    "solicitacoes" : "prestador-solicitacoes",
    "servicos"     : "prestador-servicos",
};

var ajeitaCaminho = function (url) {
    if(adapterPaths.hasOwnProperty(url)) {
        return "/view/ajax/" + adapterPaths[url] + ".html";
    } else 
        return "/view/ajax/" + url + ".html";
}
var verificaStack = function () {
    var path = window.location.href.split("/")[4];
    if(path !== undefined) {
        if(window.history.state != path) {
            window.history.pushState(path, null, null);
            inserirConteudo(ajeitaCaminho(window.history.state));
        } else {
            inserirConteudo(ajeitaCaminho(window.history.state));
        }
      }
}
var alteraEstado = function (page) {
    // Essa verificação serve para não ficar recarregando o ajax toda vez que se clica no mesmo botão.
    if(page != window.history.state) {
        if(window.location.href.split("/")[4] === undefined){
           window.history.pushState(page, null, "painel-prestador/" + page); 
        } else {
            window.history.pushState(page, null, page);
        }
        inserirConteudo(ajeitaCaminho(page));
    }
}
var manipulaNav = (id, callback) => 
    document.getElementById(id).addEventListener('click', (e) => {
        if(e["target"].id != id) {
            callback(e.target.attributes['data-content']['nodeValue']);
            switchItemNav(id, window.history.state, "#ef914c");
        }
  });
var switchItemNav = function(idPainel, itemAtual, cor) {
     [].map.call(document.getElementById(idPainel).children, function(n) {
          n.style.backgroundColor = "inherit";
          return n;
     }).forEach(function(e) {
         if(e["attributes"]["data-content"]["value"] == itemAtual){
             e.style.backgroundColor = cor;
         }
     });
}
var inserirConteudo = function (ref) {
     // Direcionador de Chamadas
     switch (window.history.state) {
            case "perfil":
                meuPerfil()
                break;
            case "solicitacoes":
                solicitacoes();
                break;
            case "servicos":
                meusServicos();
                break;
            case "mapa":             $("#janela").fadeOut(500); $("#mapa").show();  break;
            case "sair":             window.sairDoSistema(); break;
            default:                 pageCaller(ref, null); break;
     }
}
var pageCaller = function(ref, action) {
    $("#janela").html("<img alt='carregando' src='/view/img/loading.gif'>");
     $.ajax({
         url: ref,
         method: "GET",
         complete: function(data) {
             if(action != null) {
                  ajaxGenerico("GET", action.resource, action.func, {data: data});
              } else {
                  $("#janela").html(data.responseText);
                  $("#janela").fadeIn('slow');
                  $("#mapa").hide();
                 
              }
         }
     });
}

// Ajax Getter Genérico
var ajaxGenerico = function(metodo, resource, callback, obj) {
    	$.ajax({
            type: metodo,
            url: API + resource,
            headers: {
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data) {
                obj === null ? callback(JSON.parse(data.responseText))
                             : $("#janela").html(obj["data"].responseText);
                               callback(JSON.parse(data.responseText));
                               $("#janela").fadeIn('slow');
                               $("#mapa").hide();
            }
        });
}