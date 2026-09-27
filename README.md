# NexaCart AI Support

An AI-powered Shopify customer support assistant built with React, n8n, Shopify, Ollama, and Slack.

NexaCart AI Support automates common customer support requests such as order status, product information, shipping questions, returns and refunds, while routing requests that require human assistance to a support channel.

## Overview

NexaCart combines a React-based customer chat interface with an n8n automation backend.

The customer sends a message through the web interface. The request is processed by the n8n workflow, classified by an AI intent classifier, routed to the appropriate support path, and answered using Shopify data, store policies, or AI-generated responses.

For requests requiring human intervention, the workflow can escalate the conversation to the support team through Slack.

## Features

- AI-powered customer support chat
- Shopify order status lookup
- Shopify product information lookup
- Shipping information and policy support
- Return and refund eligibility checking
- Human support escalation
- Slack support notifications
- AI intent classification
- Automated response validation
- Conversation logging
- React-based customer-facing interface
- Local AI processing with Ollama

## Supported Customer Requests

The AI intent classifier routes customer requests into six main categories:

1. `order_status`
2. `product_information`
3. `shipping`
4. `return_refund`
5. `human_support`
6. `general_question`

Each category is routed to the appropriate workflow path.

## Architecture

The project uses the following technologies:

- **React + Vite** — Customer-facing web interface
- **n8n** — Workflow automation and backend orchestration
- **Shopify GraphQL API** — Order and product information
- **Ollama** — Local AI model processing
- **Qwen3:8B** — AI model used for intent classification and support responses
- **Slack** — Human support notifications
- **Git/GitHub** — Version control and project hosting

## Workflow

The main workflow follows this general process:

```text
Customer
   ↓
React Chat Interface
   ↓
n8n Webhook
   ↓
Normalize Customer Request
   ↓
AI Intent Classifier
   ↓
Support Intent Router
   ↓
┌─────────────────────────────────────────────┐
│                                             │
├── Order Status → Shopify Order Lookup       │
│                                             │
├── Product Info → Shopify Product Lookup     │
│                                             │
├── Shipping → Shipping / Order Support       │
│                                             │
├── Refund → Refund Eligibility Check         │
│                                             │
├── Human Support → Support Escalation        │
│                                             │
└── General Question → AI Support Response    │
                                              │
                     ↓
             Response Validation
                     ↓
          Approved Automated Response
                     ↓
             Customer Response
