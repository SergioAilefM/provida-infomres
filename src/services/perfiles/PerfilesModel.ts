export interface Perfiles {
    cod_perfil: string
    des_perfil: string
    des_gerencia: string
    glosa_perfil: string
    comentario: string
}

export interface PerfilesUsuario {

    cod_perfil: string
    des_perfil: string
    des_gerencia: string
    glosa_perfil: string
    cod_usuario: number
    nombre: string
    rut: string
}

export interface PerfilFuncionalidad {

    cod_perfil: string
    des_perfil: string
    des_gerencia: string
    glosa_perfil: string
    cod_rol: string
    des_rol: string
    glosa_rol: string
    cod_proceso_rol: string
    des_proceso_rol: string
    cod_funcionalidad: string
    des_funcionalidad: string
    glosa_funcionalidad: string
    cod_proceso_funcionalidad: string
    des_proceso_funcionalidad: string
    glosa_final: string
    des_criticidad: string
    comentario_criticidad: string
}

export interface PerfilRoles {

    cod_perfil: string
    des_perfil: string
    des_gerencia: string
    glosa_perfil: string
    cod_rol: string
    des_rol: string
    glosa_rol: string
    cod_proceso_rol: string
    des_proceso_rol: string
}