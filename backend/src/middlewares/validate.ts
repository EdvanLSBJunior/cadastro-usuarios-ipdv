import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validate = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (err: any) {
      res.status(400).json({
        errors: err.errors,
      });
    }
  };
};
