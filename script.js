// Recebe valores string (horário inicial, horário final) no formato "00:00"
function retornaValor(hi, hf) {
    let valor = 0;
    let horario_inicial = hi.split(":");
    let horario_final = hf.split(":");
    let horas = 0;
    let minutos = 0.0;
    horas += horario_final[0]-horario_inicial[0];
    minutos += horario_final[1]-horario_inicial[1];

    // Tratando o caso do minuto inicial ser maior que o final, e.g.: "07:51", "19:15"
    if (minutos<0) {
        horas--;
        minutos += 60;
    }

    // Considerando de 15 minutos até 3h R$ 5,00 e a partir daí R$ 2,50 por hora ou fração
    if (horas>0) {
        if (horas<3) {
            valor += 5;
        } else {
            valor += 5 + Math.ceil((horas-3) + (minutos/60)) * 2.5;
        }
    } else {
        if (minutos>15) {
            valor += 5;
        }
    }
    return valor;
}

function checarEstado(placa) {
    let placa_regex = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    let placa_regex_antiga = /^[A-Z]{3}[-]\d{4}$/;

    if (placa_regex_antiga.test(placa)) {
        let aux = "";
        for (let i=0;i<placa.length;i++) {
            if (i == 5) {
                let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
                aux += letras[placa.charAt(i)];
            } else if (placa.charAt(i) != "-") {
                aux += placa.charAt(i);
            }
        }
        console.log("Placa antiga, convertendo de \"" + placa + "\" para \"" + aux + "\"")
        placa = aux;
    } else if (!placa_regex.test(placa)) {
        console.log("Padrão de placa inválido, abortando...");
        return;
    }

    const intervalos = [
        // Pará, 0-10
        ["JTA","JWE"],
        ["NSE","NTC"],
        ["JTA","JWE"],
        ["OBT","OCA"],
        ["OFI","OFW"],
        ["OSW","OTZ"],
        ["OFI","OFW"],
        ["OSW","OTZ"],
        ["QDA","QEZ"],
        ["QVA","QVZ"],
        ["RWK","RXD"],
        // Roraima, 11-13
        ["NAH","NBA"],
        ["NUH","NUL"],
        ["RZA","RZD"],
        // Amapá, 14-16
        ["NEI","NFB"],
        ["QLN","QLT"],
        ["SAK","SAM"]
    ];
    
    for (let i=0;i<intervalos.length;i++) {
        if (placa.substring(0,3) >= intervalos[i][0] && placa.substring(0,3) <= intervalos[i][1]) {
            if (i < 11) {
                console.log("Pará");
                break;
            } else if (i < 14) {
                console.log("Roraima");
                break;
            } else {
                console.log("Amapá");
                break;
            }
        }
    }
}