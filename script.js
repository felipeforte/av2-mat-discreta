// Recebe valores string (horário inicial, horário final) no formato "00:00"
function retornaValor(hi, hf) {
    let valor = 0;
    let horario_inicial = hi.split(":");
    let horario_final = hf.split(":");
    let diff = [];
    diff.push(horario_final[0]-horario_inicial[0]);
    diff.push(horario_final[1]-horario_inicial[1]);

    // Tratando o caso do minuto inicial ser maior que o final, e.g.: "07:51", "19:15"
    if (diff[1]<0) {
        diff[0]--;
        diff[1] += 60;
    }

    // Considerando de 15 minutos até 3h R$ 5,00 e a partir daí R$ 2,50 por hora ou fração
    if (diff[0]>0) {
        if (diff[0]<3) {
            valor += 5;
        } else {
            valor += 5 + ((diff[0]-3) + (diff[1]>0)) * 2.5
        }
    } else {
        if (diff[1]>15) {
            valor += 5;
        }
    }
    return valor;
}