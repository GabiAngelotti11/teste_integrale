// Elementos do DOM
const cepInput = document.getElementById('cepInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const resultSection = document.getElementById('resultSection');

// Elementos de resultado
const cepResult = document.getElementById('cepResult');
const logradouroResult = document.getElementById('logradouroResult');
const bairroResult = document.getElementById('bairroResult');
const cidadeResult = document.getElementById('cidadeResult');
const ufResult = document.getElementById('ufResult');
const dddResult = document.getElementById('dddResult');

// Estados
let isLoading = false;

// Função para validar formato do CEP
function validarCEP(cep) {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');
    
    // Verifica se tem exatamente 8 dígitos
    if (cepLimpo.length !== 8) {
        return false;
    }
    
    // Verifica se contém apenas números
    if (!/^\d{8}$/.test(cepLimpo)) {
        return false;
    }
    
    return cepLimpo;
}

// Função para formatar CEP para exibição
function formatarCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    return cepLimpo.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

// Função para aplicar máscara no input
function aplicarMascaraCEP(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length <= 5) {
        return cepLimpo;
    }
    return cepLimpo.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}

// Função para mostrar erro
function mostrarErro(mensagem) {
    errorMessage.textContent = mensagem;
    errorMessage.style.display = 'block';
    cepInput.classList.add('error');
    resultSection.style.display = 'none';
}

// Função para limpar erro
function limparErro() {
    errorMessage.style.display = 'none';
    cepInput.classList.remove('error');
}

// Função para mostrar loading
function mostrarLoading() {
    isLoading = true;
    searchBtn.disabled = true;
    searchBtn.querySelector('.btn-text').style.display = 'none';
    searchBtn.querySelector('.loading-spinner').style.display = 'block';
}

// Função para esconder loading
function esconderLoading() {
    isLoading = false;
    searchBtn.disabled = false;
    searchBtn.querySelector('.btn-text').style.display = 'block';
    searchBtn.querySelector('.loading-spinner').style.display = 'none';
}

// Função para consultar CEP na API
async function consultarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Verifica se o CEP foi encontrado
        if (data.erro) {
            throw new Error('CEP não encontrado');
        }
        
        return data;
    } catch (error) {
        if (error.message === 'CEP não encontrado') {
            throw new Error('CEP não encontrado na base de dados');
        }
        throw new Error('Erro ao consultar o CEP. Tente novamente.');
    }
}

// Função para exibir resultados
function exibirResultados(data) {
    cepResult.textContent = data.cep || 'N/A';
    logradouroResult.textContent = data.logradouro || 'N/A';
    bairroResult.textContent = data.bairro || 'N/A';
    cidadeResult.textContent = data.localidade || 'N/A';
    ufResult.textContent = data.uf || 'N/A';
    dddResult.textContent = data.ddd || 'N/A';
    
    resultSection.style.display = 'block';
}

// Função principal para buscar CEP
async function buscarCEP() {
    const cep = cepInput.value.trim();
    
    // Limpa erros anteriores
    limparErro();
    
    // Valida o CEP
    const cepValidado = validarCEP(cep);
    if (!cepValidado) {
        mostrarErro('Por favor, digite um CEP válido no formato XXXXX-XXX ou XXXXXXXX');
        return;
    }
    
    // Mostra loading
    mostrarLoading();
    
    try {
        // Consulta a API
        const dados = await consultarCEP(cepValidado);
        
        // Exibe os resultados
        exibirResultados(dados);
        
    } catch (error) {
        mostrarErro(error.message);
    } finally {
        esconderLoading();
    }
}

// Event Listeners

// Buscar CEP ao clicar no botão
searchBtn.addEventListener('click', buscarCEP);

// Buscar CEP ao pressionar Enter no input
cepInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isLoading) {
        buscarCEP();
    }
});

// Aplicar máscara no input
cepInput.addEventListener('input', (e) => {
    const valor = e.target.value;
    const valorFormatado = aplicarMascaraCEP(valor);
    e.target.value = valorFormatado;
    
    // Limpa erro quando o usuário começa a digitar
    if (errorMessage.style.display === 'block') {
        limparErro();
    }
});

// Limpar erro quando o input recebe foco
cepInput.addEventListener('focus', () => {
    if (errorMessage.style.display === 'block') {
        limparErro();
    }
});

// Prevenir múltiplas consultas simultâneas
cepInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && isLoading) {
        e.preventDefault();
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Foca no input ao carregar a página
    cepInput.focus();
    
    // Adiciona exemplo de CEP válido no placeholder
    cepInput.placeholder = 'Digite o CEP (ex: 01310-100 ou 01310100)';
});

