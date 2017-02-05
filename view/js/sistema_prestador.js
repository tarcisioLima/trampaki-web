function meuPerfil(){
        novaJanela("/view/ajax/prestador-perfil.html")
        $.ajax({
            type:"GET",
            url:"https://trampaki-api-tunnes.c9users.io/carregar-dados-prestador",
            headers:{
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data){
                data = JSON.parse(data.responseText);
                	
                carregarCategorias(data.categorias);
                var imagem = document.getElementById('imagem_header');
                	data.codigoImagem != null ? carregarImagem(imagem, data.codigoImagem) : null;
                	
                	document.getElementById('nm_prestador').innerHTML = data.nome;
                    
                    document.getElementById('nome').innerHTML = data.nome;
                    
                    document.getElementById('ds_profissional').innerHTML = data.dsProfissional;
                    
                    document.getElementById('ds_email').innerHTML = data.email;
                	
                	document.getElementById('cd_telefone').innerHTML = data.telefone;
                	
                    document.getElementById('sg_estado1').innerHTML = data.endereco.estado;

                	document.getElementById('header_estado').innerHTML = data.endereco.estado;
                	    
                	document.getElementById('cidade').innerHTML = data.endereco.cidade;
                	
                	document.getElementById('header_cidade').innerHTML = data.endereco.cidade; 
                	
                	document.getElementById('cep').innerHTML = data.endereco.CEP;
                	
                	document.getElementById('numResiden').innerHTML = data.endereco.numeroResidencia;   
                	   
                	document.getElementById('login').innerHTML = data.login.login;

                	document.getElementById('senha').innerHTML = data.login.senha;
                	    
                	document.getElementById('token').innerHTML = data.login.token;
                		
                }
    });
    }

function meusServicos(){
        novaJanela("/view/ajax/prestador-servicos.html");
	    
	    $.ajax({
            type:"GET",
            url:"https://trampaki-api-tunnes.c9users.io/meus-servicos",
            headers:{ 
                "Authorization": sessionStorage.getItem("authorization")
            },
            complete: function(data){
            	data = JSON.parse(data.responseText);
                var servicos = document.getElementById('servicos');
                	servicos.innerHTML = ' ';
                var sx = ['ABERTO','ENCERRADO','CANCELADO','SUSPENSO'];
                [].slice.call(data).forEach(function(servico){
                    var item_servico = document.createElement("div");
                    var imagem_servico = document.createElement("div");
                        servico.cd_imagem01 != null ? carregarImagem(imagem_servico, servico.cd_imagem01) : null;
                    var info_servico = document.createElement("div");
                    var titulo = document.createElement("strong");
                        titulo.innerHTML = servico.nm_titulo;
                    var cidade = document.createElement("p");
                        cidade.innerHTML = servico.nm_cidade;
                    var status = document.createElement("p");
                        
                        status.innerHTML = sx[parseInt(servico.cd_status)];
                        
                    item_servico.onclick=function(){
                        visualizaAnuncio(servico.cd_anuncio);
                    };
                    item_servico.className = 'item_servico';
                    imagem_servico.className = 'imagem_servico';
                    info_servico.className = 'info_servico';

                    info_servico.appendChild(titulo);
                    info_servico.appendChild(cidade);
                    info_servico.appendChild(cidade); 
                    info_servico.appendChild(status);
                        
                        
                    item_servico.appendChild(imagem_servico);
                    item_servico.appendChild(info_servico);
                    servicos.appendChild(item_servico);
                	});
                		
                }
    });
	    
    }
    
    // Nova solicitação prestador ----> Anuncio. 
    function enviarSolicitacao(codigoAnuncio){
    	$.ajax({
            type:"POST",
            url:"https://trampaki-api-tunnes.c9users.io/nova-conexao-prestador",
            headers:{
                "Authorization": sessionStorage.getItem("authorization")
            },
            data:{
            	codigo_anuncio: codigoAnuncio
            },
        	statusCode:{
        		400: function(){
        		    modalConectar(400);
        		},
        		201: function(){
        		    modalConectar(201);
        		}
        	}
        });
    }    