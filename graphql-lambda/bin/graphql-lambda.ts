#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib/core';
import { ExampleStack, ExampleStackProps } from '../lib/graphql-lambda-stack';

const app = new cdk.App();
const props: ExampleStackProps = {}; // Add any required props here
new ExampleStack(app, 'GraphqlLambdaCdkStackTest', props);
