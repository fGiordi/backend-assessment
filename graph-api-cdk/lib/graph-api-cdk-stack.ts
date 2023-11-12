import * as cdk from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from "aws-cdk-lib/aws-apigateway"
import * as path from "path";

export class GraphqlCdkStack  extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      const lambdaFunction = new lambda.Function(this, "api", {
          runtime: lambda.Runtime.NODEJS_16_X,
          handler: "graphql.handler",
          code: lambda.Code.fromAsset(path.join(__dirname, "../../lambda")),
      }) 

      new apiGateway.LambdaRestApi(this, "graph-ql-endpoint", {handler: lambdaFunction})
  }
}