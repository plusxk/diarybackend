pipeline {
  agent any
  //tools {nodejs "latest"}
  stages {
    stage('build') {
      steps {
        bat 'docker-compose up -d'
        bat 'npm install'
      }
    }
    stage('test') {
      steps {
        bat 'npm test'
      }
    }
    stage('end build'){
      bat 'docker-compose down'
    }
  }
}