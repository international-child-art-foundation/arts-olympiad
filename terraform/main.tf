terraform {
  cloud {
    organization = "andrew-tf-playground"
    workspaces {
      name = "learn-tfc-aws"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5/5"
    }
  }

  required_version = ">= 1.5.1"
}

provider "aws" {
  region = "us-east-1"
}