pipeline {
  agent any
  //tools {nodejs "latest"}
  stages {
    stage('build') {
      steps {
        bat 'npm install'
      }
    }
    stage('test') {
      steps {
        bat 'npm test'
      }
    }
  }
}