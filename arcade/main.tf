provider "aws" {
  region = "us-east-1"
}

# DynamoDB Table for Leaderboards & Scores
resource "aws_dynamodb_table" "game_scores" {
  name         = "MatchMakerScores"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "scoreId"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "scoreId"
    type = "S"
  }

  tags = {
    Environment = "Production"
    Project     = "GamifiedLearningMatchMaker"
  }
}

# IAM Role for Lambda Backend Function
resource "aws_iam_role" "lambda_role" {
  name = "matchmaker_lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.game_scores.name
}
