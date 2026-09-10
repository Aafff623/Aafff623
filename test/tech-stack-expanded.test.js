const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const ROOT = path.resolve(__dirname, '..');
const README_PATHS = [path.join(ROOT, 'README.md'), path.join(ROOT, 'README.zh.md')];
const HISTORICAL_BADGES = [
  'React', 'Next.js', 'Tailwind CSS', 'Vite', 'Framer Motion', 'GSAP', 'Socket.IO', 'Prisma', 'Vitest',
  'Spring Cloud Alibaba', 'OpenFeign', 'Sentinel', 'Seata', 'Spring Security', 'Spring AI',
  'RabbitMQ', 'Kafka', 'Elasticsearch', 'PostgreSQL', 'Supabase', 'Milvus', 'FAISS', 'Redisson', 'Canal', 'XXL-Job',
  'Claude Code', 'Cursor', 'Codex', 'Skills', 'LangGraph4j', 'LangGraph', 'OpenAI Agents SDK', 'Dify', 'LiteLLM', 'Ragas', 'DeepEval', 'CrewAI', 'Agentic UI',
  'RPC', 'gRPC', 'etcd', 'Vert.x', 'Rust',
  'FastAPI', 'Pydantic', 'SQLAlchemy', 'httpx', 'Celery', 'asyncio', 'pytest',
  'TGI', 'Triton', 'Ethers.js', 'Viem', 'Wagmi', 'Smart Accounts', 'Session Keys',
  'Kubernetes', 'Harbor', 'Nginx', 'GitHub', 'Vercel', 'ELK', 'SkyWalking', 'Grafana', 'Prometheus'
];

test('expanded tech stack restores historical tools and removes the separate engineering-methods card', () => {
  const readmes = README_PATHS.map(filePath => fs.readFileSync(filePath, 'utf8'));

  for (const readme of readmes) {
    for (const badge of HISTORICAL_BADGES) {
      assert.ok(readme.includes(`alt="${badge}"`), `${badge} should be listed in the expanded tech stack`);
    }
    assert.doesNotMatch(readme, /Harness Engineering &amp; TTA Toolchain/);
    assert.doesNotMatch(readme, /工程方法/);
  }

  const techStackImageSources = readmes.map(readme => {
    const start = readme.indexOf('## 🛠️');
    const techStack = readme.slice(readme.indexOf('<table width="100%">', start), readme.indexOf('\n---', start));
    return [...techStack.matchAll(/<img src="([^"]+)"/g)].map(match => match[1]);
  });
  assert.deepEqual(techStackImageSources[0], techStackImageSources[1], 'English and Chinese tech-stack tables should keep the same badge order');
});
