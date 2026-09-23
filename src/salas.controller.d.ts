import type { Request, Response } from "express";
export declare function listarSalas(_req: Request, res: Response): Promise<void>;
export declare function crearSala(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function crearReserva(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function borrarSala(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=salas.controller.d.ts.map