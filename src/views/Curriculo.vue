<template>
  <div class="curriculo flex">
    <div class="left">
      <h1>Matheus da Silva Galdino</h1>
      <h3>Desenvolvedor Full-Stack Junior</h3>
      <p>Desenvolvedor de sistemas web front-end e back-end. Formado em Análise e Desenvolvimento de Sistemas pela Universidade Paulista, tenho experiência de 7 meses na área de Desenvolvimento Web. Participei de projetos mobile utilizando FLutter. </p>
      <div class="experiencia">
        <div class="titulo-content flex ">
          <div class="quadrado"></div>
          <h3>EXPERIÊNCIA PROFISSIONAL</h3>
        </div>
        <div class="experiencia-content">
          <h4>Desenvolvedor Front-End Junior</h4>
          <h5>MAP Innovation, Manaus - AM</h5>
          <h5>08/2022 - presente</h5>  
          <ul>
            <li>Manutenção e personalização de sistemas web existentes.</li>
            <li>Documentação e engenharia de requisitos.</li>
            <li>Desenvovi um software voltado ao administrativo, um Dashboard para análise financeira da empresa e resumo de outros setores, uma outra funcionalidade era o cadastro de informações para alimentar os gráficos. Desenvolvido em Python / Django</li>
            <li>Auxilei no desenvolvimento de um app para telemetria</li>
            <li>Desenvolvi um sistema já existente, com o objetivo de melhorar a peformance, e personaliza-lo na melhor forma possível. O sistema é voltado a TV, com velocimetros e dados essenciais para "chão de fábrica". Desenvolvido em Vue.Js</li>
            <li>Foi ambicioso, revivi um projeto de 2019. com back-end em Django rest framework, front-end em Node.js e app mobile, Klotin. Tive o papel de faze-lo funcionar e documenta-lo. no back-end, reescrevi a maior parte do código, no front-end mudei o layout e melhorei o layout e por fim, desenvolvi do zero o App em flutter. </li>
          </ul>
        </div>
        <h4></h4>
      </div>
    </div>
    <div class="right ">
      <div class="rede-ico">
        <img src="@/assets/rede/email.svg" alt="">
        <p>matheus20galdino@gmail.com</p>
      </div>
      <div class="rede-ico">
        <img src="@/assets/rede/whatsapp.svg" alt="">
        <p>(92)99451-7272</p>
      </div>
      <div class="rede-ico">
        <img src="@/assets/rede/location.svg" alt="">
        <p>Manaus - AM</p>
      </div>
      <div class="rede-ico">
        <img src="@/assets/rede/linkedin.svg" alt="">
        <p>https://www.linkedin.com/in/matheusstyt/</p>
      </div>
      <div class="rede-ico">
        <img src="@/assets/rede/github.svg" alt="">
        <p>https://github.com/matheusstyt</p>
      </div>
    </div>


  </div>
</template>
<script>
import jsPDF from 'jspdf';
export default {
  methods: {
  generatePDF() {
    const doc = new jsPDF();
    const elementToPrint = document.getElementById('curriculo');

    doc.html(elementToPrint, {
      callback: function (doc) {
        doc.save('curriculo.pdf');
      }
    });
  }
}

}
</script>
<style lang="scss">
h1, h3, h4, h5, p, ul, li {
  color: rgb(29, 29, 29);
  font-family: "Arial";
}
.header{
  display: none;
}
.curriculo{
  margin: 2vmax auto;
  background-color: #fff;
  width: 400px;
  aspect-ratio: 21/29;
  .left{
    padding: 0 1em;
    width: 55%;
    h1{
      font-size: 14px;

    }
    h3{
      font-size: 11px;
      font-weight: 500;

    }
    p{
      font-size: 9px;
      text-align: justify;
    }
    .titulo-content{
      gap: 0.5em;
      h3{
        margin: 0;
      }
      .quadrado{
        width: 12px;
        margin: 0;
        padding: 0;
        aspect-ratio: 1/1;
        background-color: rgb(103, 47, 194);
      }
    }
    .experiencia-content{
      h4{
        font-size: 10px;
        margin: 0.5em 1.8em;
      }
      h5{
        font-size: 9px;
        color: #535353;
        margin: 0.3em 2em;
      }
      ul{
        margin: 0;
        height: 100%;
        padding-right: 0.4em;
        li{
          font-size: 9px;
          text-align: left;
        }
      }
    }
  }
  .experiencia{
    border-right: 2px solid rgb(123, 43, 228);
  }
  .right{
    width: 45%;
    .rede-ico{
      img{
        height: 9px;
        aspect-ratio: 1/1;
      }
      p{
        font-size: 9px;
        margin: 0;
      }
      margin: 0.3em 0;
      display: flex;
      gap: 0.4em;
    }
  }
}
.flex{
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>