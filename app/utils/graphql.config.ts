import { graphQLSchema } from "@/graphql/index.resolver";
import { Request, Response } from "express";
import { GraphQLSchema } from "graphql";

interface GraphQLContext {
  req: Request;
  res: Response;
}

interface GraphQLConfig {
  schema: GraphQLSchema;
  graphiql: boolean;
  context: GraphQLContext;
}

export function graphqlConfig(req: Request, res: Response): GraphQLConfig {
  return {
    schema: graphQLSchema,
    graphiql: true,
    context: { req, res },
  };
}
