# ADR 0006: Tech Stack Badges Are Repo-Evidence Only

## Status

Accepted (2026-08-28).

## Context

The badge wall had grown to ~70 badges across 9 groups. Several entries came from course syllabi and learning plans (the 2026-08 course-driven additions in `CONTEXT.md`) rather than shipped code: MyBatis-Plus conflicted with the actual JPA-first course stack, RabbitMQ conflicted with Kafka, and tools such as LangGraph, Dify, Rust, FastAPI, Ragas, CrewAI had no repository backing them. The wall overstated hands-on experience.

An audit of all 62 repositories under the account (languages API plus key build files and READMEs — notably `sky-out-ai`, `tourism-master`, `simple-ai-code-helper`, `realtime-streaming-systems-lab`, `ResumeWise`, `lottery-pattern-analyzer`, the Django/Flask coursework repos, `fandou-ai4s`, `vllm-cscc-leadcup`) produced an evidence-backed inventory.

## Decision

Badges are limited to technologies with at least one repository or competition artifact as proof — 7 groups, 32 badges:

- **Frontend:** Vue, TypeScript, UniApp, Astro, Node.js
- **Java / Spring:** Java, Spring Boot, Spring MVC, MyBatis-Plus, Sa-Token
- **Middleware & microservices:** MySQL, Redis, MongoDB, MinIO, RocketMQ, Netty, Nacos, Gateway
- **AI / agents:** LangChain4j, Qwen / DashScope, MCP, RAG
- **Python:** Python, Django, Flask
- **Systems / inference:** vLLM, HIP / ROCm, Hygon DCU, Biren GPU (competition proof)
- **DevOps:** Docker, Git, Linux

Removed: course-only or awareness-only badges — Spring Cloud Alibaba stack (OpenFeign, Sentinel, Seata), Kafka, JMeter, Spring AI / Spring AI Alibaba, LangGraph / LangGraph4j, OpenAI Agents SDK, Dify, LiteLLM, Ragas, DeepEval, CrewAI, Agentic UI, Harness Agent / Loop Agent, Rust, RPC / gRPC / etcd / Vert.x, RabbitMQ, Elasticsearch, PostgreSQL, Supabase, Milvus, FAISS, XXL-Job, Canal, Redisson, Socket.IO, Prisma, Vitest, React / Next.js / Tailwind (AgentCFO keeps its own badges in Classic project), FastAPI / Pydantic / SQLAlchemy / httpx / Celery / pytest / asyncio, Viem / Wagmi, TGI, Triton, Kubernetes, Harbor, Nginx, Docker Compose, Prometheus, Grafana, ELK, SkyWalking.

Added from repo evidence: Astro, Spring MVC, Sa-Token, MongoDB, RocketMQ, Netty, Django, Flask.

In-practice items (`nb-wfw` skeleton: Spring Cloud Alibaba, OpenFeign, Sentinel, Seata, Kafka, JMeter) stay in "What I'm learning" text until they produce a repository.

## Consequences

Every badge on the wall maps to a concrete repository, so the wall doubles as an honest inventory. The two 2026-08 course-driven badge entries in `CONTEXT.md` are superseded by this rule and marked as such. New badges require a repository (or competition artifact) link before joining the wall; re-adding removed badges without new evidence is a regression.
