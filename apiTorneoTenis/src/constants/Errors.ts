const errors = {
    BADPARTIDOOBJECT: () => `Bad Partido Obj`,
    BADTENISTAOOBJECT: () => `Bad Tenista Obj`,
    BADBODY: (s: string) => `Bad Post Req: ${s}`,
    BADDELETEREQUEST: (s: string) => `Bad Delete Req: ${s}`,
    GANADORNOJUGOERROR: () => "Ganador no jugo en el partido",
    COULDNTFINDIDERROR: (s: string) => `La ID ${s} no se pudo encontrar`,
    MISSINGDBERROR: () => "No se pudo encontrar la base de datos",
};

export default errors
