function formatterData(data) {
  if (!data) return '-';
  
  const agora = new Date();
  const dataPassada = new Date(data);
  const diffMs = agora - dataPassada;
  const diffSegundos = Math.floor(diffMs / 1000);
  const diffMinutos = Math.floor(diffSegundos / 60);
  const diffHoras = Math.floor(diffMinutos / 60);
  const diffDias = Math.floor(diffHoras / 24);
  
  if (diffSegundos < 60) {
    return 'agora há pouco';
  } else if (diffMinutos < 60) {
    return `há ${diffMinutos} minuto${diffMinutos > 1 ? 's' : ''}`;
  } else if (diffHoras < 24) {
    return `há ${diffHoras} hora${diffHoras > 1 ? 's' : ''}`;
  } else if (diffDias < 7) {
    return `há ${diffDias} dia${diffDias > 1 ? 's' : ''}`;
  } else {
    return dataPassada.toLocaleDateString('pt-BR');
  }
}

export default formatterData