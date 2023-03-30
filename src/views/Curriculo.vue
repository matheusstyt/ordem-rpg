<template>
  <div class="geral-page">
    <div class="curriculo" id="print">
      <div class="left">
        <h1>Matheus da Silva Galdino</h1>
        <h3>Desenvolvedor Full-Stack Junior</h3>
        <p>Desenvolvedor de sistemas web front-end e back-end. Formado em Análise e Desenvolvimento de Sistemas pela Universidade Paulista, entusiata por solucionar problemas e desenvolver soluções práticas. Possuo 7 meses de experiênciana área de Desenvolvimento Web. Participei de projetos mobile utilizando FLutter. </p>
        <div class="container-info">
          <div class="titulo flex ">
            <div class="quadrado"></div>
            <h3>EXPERIÊNCIA PROFISSIONAL</h3>
          </div>
            <h4>Desenvolvedor Front-End Junior</h4>
            <h5>MAP Innovation, Manaus - AM</h5>
            <h5>08/2022 - presente</h5>  
            <ul>
              <li>Manutenção e personalização de sistemas web existentes.</li>
              <li>Documentação e engenharia de requisitos.</li>
              <li>Desenvovi um software voltado ao administrativo, um Dashboard para análise financeira da empresa e resumo de outros setores, uma outra funcionalidade era o cadastro de informações para alimentar os gráficos. Desenvolvido em Python / Django</li>
              <li>Auxilei no desenvolvimento de um app para telemetria</li>
              <li>Desenvolvi um sistema já existente, com o objetivo de melhorar a peformance, e personaliza-lo na melhor forma possível. O sistema é voltado a TV, com velocimetros e dados essenciais para "chão de fábrica". Desenvolvido em Vue.Js</li>
              <li>Foi ambicioso, revivi um projeto de 2019. com back-end em Django rest framework, front-end em Node.js e app mobile, Klotin. Tive o papel de faze-lo funcionar e documenta-lo. no back-end, reescrevi a maior parte do código, no front-end um gráfico de gantt de atividades de manuteção de máquinas e os cáculos baseados no tempo de operação e parada (mttr) e (mtbf) e melhorei o layout e por fim, desenvolvi do zero o App em flutter. </li>
            </ul>
        </div>
      </div>
      <div class="right ">
        <div class="container-contato">
          <div class="info-rede">
            <img src="@/assets/rede/email.svg" alt="">
            <p>matheus20galdino@gmail.com</p>
          </div>
          <div class="info-rede">
            <img src="@/assets/rede/whatsapp.svg" alt="">
            <p @click="zap">(92)99451-7272</p>
            
          </div>
          <div class="info-rede">
            <img src="@/assets/rede/location.svg" alt="">
            <p>Rua ilha mexicana, Cidade Nova II, nº374, Manaus - AM</p>
          </div>
          <div class="info-rede">
            <img src="@/assets/rede/linkedin.svg" alt="">
            <p>https://www.linkedin.com/in/matheusstyt/</p>
            
          </div>
          <div class="info-rede">
            <img src="@/assets/rede/github.svg" alt="">
            <p>https://github.com/matheusstyt</p>
            
          </div>
        </div>
        <div class="container-info">
          <div class="titulo flex">
            <div class="quadrado"></div>
            <h3>COMPETÊNCIAS</h3>
          </div>
          <P>HTML, CSS, Javascript, Vue.Js, Python, Django, Django Rest Framework, SQL Server, Flutter / Dart, Engenharia de Requisitos, Construção de API Rest Full.</P>
        </div>
        <div class="container-info">
          <div class="titulo flex">
            <div class="quadrado"></div>
            <h3>EDUCAÇÃO</h3>
          </div>
          <h4>Tecnólogo em Análise e Desenvolvimento de Sistemas</h4>
          <h5>Universidade Paulista - UNIP</h5>
          <h5>02/2020 - 12/2021</h5>  
          <ul>
            <li>Estudei infraestrutura de redes de computadores, configuração de redes e roteadores, lógica de programação, ciclo de vida de um software com as metodologias ágeis (Scrum) em engenharia de software I e II. Liguagem C, Java, HTML, CSS e Javascript.</li>
            <li>Mini software em Liguagem C, cadastro básico de cliente para clinica médica.</li>
            <li>Projeto Multidisciplinar Integrador (PIM) Final. Liderei uma equipe de 5 integrantes para desenvolver um site, um aplicativo com java swing e conexão com bancos de dados Sql server.</li>
          </ul>
        </div>
        <div class="container-info">
          <div class="titulo flex">
            <div class="quadrado"></div>
            <h3>PROJETO PESSOAL</h3>
          </div>
          <h5>Sistema Ordem Paranormal</h5>
          <ul>
            <li>Esse sistema foi uma ídeia que eu e meus amigos tivemos, é basiado em um Jogo de RPG desenvolvido pelo YouTuber Celbit.</li>
            <li>Front-end desenvolvido com framework Vue.js</li>
            <li>Back-end desenvolvido com framework Django</li>
            <li>API REST com a biblioteca django-rest-framework</li>
            <li>As funcionalidades são: uma lista de contantos, criar sessões de partida e convidar contatos a jogar na sua sessão, criar seu próprio personagem e gerenciar suas sessões. adicionar item e afins.</li>
          </ul>
        </div>
      </div>
    </div>
    <button @click="generatePDF">Save</button>
  </div>
  
</template>
<script>
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
export default {
  methods: {
    go_zap(){
      window.open("https://wa.me/5592994517272", "_blank")
    },
    go_email(){
      window.open("mailto:matheus20galdino@gmail.com", "_blank")
    },
    go_linkedin(){
      window.open("https://www.linkedin.com/in/matheusstyt/", "_blank")
    },
    go_git(){
      window.open("https://github.com/matheusstyt", "_blank")
    },
    generatePDF() {

      const element = document.getElementById('print');
      html2pdf(element, {
        margin:       0,
        filename:     'curriculo_matheus_galdino.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
        beforePageContent: function(currentPage, doc) {
          if (currentPage === 1) {
            doc.text('Meu currículo', 20, 20);
          }
        }
      });
    }

}

}
</script>
<style lang="scss">
h1, h3, h4, h5, p, ul, li {
  color: rgb(48, 48, 48);
  font-family: "Arial";
}
a{
  width: 100%;
margin: 0;
padding: 0;
text-decoration: none;
}
a:-webkit-any-link {
  height: 0;
  width: 0;
}
h3{
  font-weight: 600;
  color: rgb(123, 43, 228);
}
h4{
  color: rgb(57, 10, 117);
}

.header{
  display: none;
}
.curriculo{
  display: flex;
  margin: 2vmax auto;
  background-color: #fff;
  width: 800px;
  aspect-ratio: 21/29;
  .left{
    padding: 0 0.6em;
    width: 55%;

  }
  .experiencia{
    border-right: 2px solid rgb(123, 43, 228);
  }
  .right{
    width: 45%;
    margin-top: 0.7em;
    .info-rede{
      margin: 0.3em 0;
      display: flex;
      width: 100%;
      gap: 0.4em;

      img{
        height: 1em;
        aspect-ratio: 1/1;
      }
      p{
        margin: 0;
        cursor: pointer;
      }
      p:hover{
        color: rgb(104, 41, 185);
      }
    }
  }
}
.container-info{
  padding-right: 0.5em;
  .titulo{
      gap: 0.5em;
      .quadrado{
          width: 0.8em;
          aspect-ratio: 1/1;
          margin: 0;
          padding: 0;
          background-color: rgb(103, 47, 194);
      }
      h3{
          margin: 0;     
      }
  }
  p{
        text-align: justify;
  }
  h4{
    
    margin: 0.5em 2em;
  }
  h5{
    color: #535353;
    font-size: 1em;
    margin: 0.3em 2em;
  }
  ul{
    margin: 0;
    height: 100%;
    padding: 0.5em 0.5em 1em 1.9em;
    li{
      margin-bottom: 0.5em;
      text-align: justify;
      font-size: 0.99em;
    }
  }
}
.flex{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>