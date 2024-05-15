export class Slug {
    private value: string

    constructor(value: string) {
        this.value = value
    }

    get Value() {
        return this.value
    }

    /**
     * Receba uma string e a formate em uma 'slug'.
     * 
     * Exemplo: "String de exemplo" => "String-de-exemplo"

     * @param text {string}
     */
    static createFromText(text: string) {
        const slugFormatted = text
        .normalize("NFKD") // remove/converte caracteres não aceitos por um Slug
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Regex que obtem todos espaços em branco por hifen.
        .replace(/\[^\w-]+/g, '') // Regex que obtem caracteres que não são letras, números ou sublinhados em uma string por uma string vazia.
        .replace(/_/g, '-') // Substitui todos os underlines por hifens.
        .replace(/--+/g, '-') // Substitui hifens seguidos por apenas 1.
        .replace(/-$/g, '') // Substitui hifens qu estão no final da string por uma string vazia.

        return new Slug(slugFormatted)
    }
}