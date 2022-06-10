export function name(ev){
    ev.currentTarget.maxLength = 50;
    return ev;
}

export function description(ev){
    ev.currentTarget.maxLength = 5000;
    return ev;
}

export function supply(ev){
    let value = ev.currentTarget.value;
    value = value.replace(/\D/g, ""); //regex para aceitar apenas numeros.
    ev.currentTarget.value = value;
    return ev;
}

export function price(ev){
    let value = ev.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2") //regex para a virgura
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".") //regex para juntar de 3 colocar .
    ev.currentTarget.value = value;
    return ev;
}
