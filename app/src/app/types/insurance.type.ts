export interface Inputs {
    input1?: string | null;
    input2?: string | null;
    input3?: string | null;
    input4?: string | null;
    input5?: string | null;
    input6?: string | null;
    input7?: string | null;
    input8?: number | null;
    input9?: string | null;
    input10?: string | null;
    input11?: string | null;
    input12?: number | null;
    input13?: number | null;
    input14?: string | null;
    input15?: string | null;
    input16?: string | null;
    input17?: number | null;
    input18?: number | null;
    input19?: number | null;
    input20?: number | null;
    input21?: number | null;
    input22?: number | null;
    input23?: number | null;
}

export interface Branch {
    branch: string,
    district: string,
    province: string,
    zone: string
}

export interface Vehicle {
    type: string,
    make: string,
    model: string,
}

export interface Policy {
    mainclass: string,
    subclass: string
}
