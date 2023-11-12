import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Duration, Size } from 'aws-cdk-lib';
import { Architecture, Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { CorsHttpMethod, HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import path = require('path');
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import * as apigateway from '@aws-cdk/aws-apigatewayv2';


export interface ExampleStackProps {
  // Add any required props here

}

export class ExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

     const api = new HttpApi(this, 'httpAPI', {
      apiName: `http-api`,
      corsPreflight: {
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.POST],
        allowOrigins: ['*'],
      },
    });

    // const graphqlHandler = new Function(this, 'graphqlHandler', {
    //   runtime: Runtime.NODEJS_16_X,
    //   code: Code.fromAsset(path.join(__dirname, '../lambda')),
    //   handler: 'graphql.handler',
    //   memorySize: Number(Size.mebibytes(1024)),
    //   timeout: Duration.seconds(30),
    //   architecture: Architecture.ARM_64,
    //   logRetention: RetentionDays.ONE_WEEK,
      
    // });

    const lambda = new Function(this, 'api-handler', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'graphql.handler',
      code: Code.fromAsset(
        path.join(__dirname, '../../lambda')
      ),
      memorySize: Size.gibibytes(1).toMebibytes(),
      architecture: Architecture.ARM_64,
      logRetention: RetentionDays.ONE_DAY,
      timeout: Duration.seconds(5),
      environment: {
        REGION: Stack.of(this).region,
      },
    });

   
    // @ts-ignore
    const apiIntegration = new HttpLambdaIntegration('graphqlEndpoint', lambda)

    // api.addRoutes({
    //   path: '/{proxy+}',
    //   methods: [apigateway.HttpMethod.ANY],
    //   // @ts-ignore
    //   integration: apiIntegration,
    // });

    // @ts-ignore
    new apigateway.HttpApi(this, 'HttpApi', {
      defaultIntegration: apiIntegration,
    });


}

}