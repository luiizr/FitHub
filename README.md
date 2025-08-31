# Fithub 

Este é um projeto **fullstack** utilizando **NestJS** (backend) e **Angular** (frontend) que tem como objetivo auxiliar o usuário a entender qual o **próximo passo na sua jornada de treino e alimentação**, integrando dados de aplicativos já utilizados no dia a dia e fornecendo insights personalizados através de gráficos e **Inteligência Artificial**.


## Objetivo

- A aplicação visa centralizar as informações de **treino, alimentação, peso corporal e sono** em um único sistema, permitindo que o usuário acompanhe sua evolução com **gráficos detalhados** e receba recomendações de **IA** baseadas nos seus objetivos (ex: hipertrofia, perda de gordura, recomposição corporal).

## Status

🚧 Em desenvolvimento – fase inicial de definição de arquitetura e integração de dados.

## Funcionalidades

- **Integração com FatSecret**: importar dados alimentares (via **PDF**) para análise de macronutrientes e calorias.
- **Integração com Hevy**: adicionar dados de treino (foto/resumo com volume, séries, repetições e duração).
- **Registro de sono**: acompanhar qualidade e quantidade do sono.
- **Peso corporal diário**: evolução de medidas com gráficos de progresso.
- **Dashboard inteligente**:
  - Gráficos comparativos semanais e históricos
  - Gráfico detalhado por dia (treino, alimentação, sono, peso)
  - Resumo de pontos fortes e fracos do dia
- **Inteligência Artificial**:
  - Analisa os dados de treino + dieta + peso
  - Retorna recomendações personalizadas
  - Sugere próximos passos baseados no objetivo definido pelo usuário


## Tecnologias

- **Frontend**: Angular  
- **Backend**: NestJS  
- **Banco de dados**: (a definir, possivelmente PostgreSQL ou Firestore)  
- **Integrações externas**:  
  - FatSecret (dados alimentares em PDF)  
  - Hevy (dados de treino em imagens/resumo)  
- **IA**: análise de dados para recomendações personalizadas  



## 📄 Licença

Este projeto é open-source sob a licença MIT.