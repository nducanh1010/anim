export interface GraveyardProject {
  id: string;
  title: string;
  era: string;
  category: 'No PMF' | 'Scope Creep' | 'Overengineering' | 'Economic Death';
  vision: string;
  failReason: string;
  lessons: string;
  stack: string[];
  epitaph: string;
}

export const GRAVEYARD_PROJECTS: GraveyardProject[] = [
  {
    id: 'crypto-arbitrage-bot',
    title: 'FlashSwap Arbitrage Bot',
    era: '2023 †',
    category: 'Economic Death',
    vision: 'A high-frequency flashloan bot scanning Uniswap and Sushiswap to automatically capture micro price discrepancies with zero collateral.',
    failReason: 'MEV searchers and flashbots frontran every single transaction directly in the mempool. Spent 0.35 ETH (~$750) purely in failed gas fees in a single Friday night.',
    lessons: 'If your strategy relies on public mempool speeds without proprietary private RPC relays, you are not the predator—you are liquidity for MEV bots.',
    stack: ['Solidity', 'Ethers.js', 'Flashloans', 'Hardhat', 'Alchemy'],
    epitaph: '“Born with high hopes, died in the gas war.”',
  },
  {
    id: 'omnitask-ai',
    title: 'OmniTask AI Life OS',
    era: '2024 †',
    category: 'No PMF',
    vision: 'An autonomous AI assistant that digests calendar events, emails, and Apple Health data to automatically orchestrate your ideal 24-hour routine.',
    failReason: 'OpenAI GPT-4 token costs exceeded $85/month for just 6 active test users. Worse: users found typing prompts to plan their day 5x more exhausting than just using pen and paper.',
    lessons: 'Don’t build a conversational interface for problems better solved by a simple toggle switch or a paper notebook.',
    stack: ['Next.js 14', 'LangChain', 'OpenAI API', 'Supabase', 'Tailwind'],
    epitaph: '“Drowned in token bills before finding a single paying user.”',
  },
  {
    id: 'voxel-world-3d',
    title: 'VoxelCraft WebGL Sandbox',
    era: '2024 †',
    category: 'Overengineering',
    vision: 'A zero-install multiplayer voxel terrain world in the browser featuring dynamic lighting, procedural cave generation, and WebRTC peer sync.',
    failReason: 'Greedy naive meshing algorithms choked on memory. Exploring beyond 16 render distance consumed 4.2GB of client RAM, turning MacBook fans into jet engines and crashing Safari tab threads.',
    lessons: 'Browser JavaScript garbage collection is ruthless with per-frame mesh allocations. Web Workers and InstancedBufferGeometry are non-negotiable for 3D worlds.',
    stack: ['Three.js', 'WebAudio API', 'WebRTC', 'TypeScript', 'GLSL'],
    epitaph: '“Killed by out-of-memory errors and thermal throttling.”',
  },
  {
    id: 'devsnippet-social',
    title: 'CodePoetry Social',
    era: '2025 †',
    category: 'Scope Creep',
    vision: 'A minimalist, aesthetic social network where developers share self-contained code snippets strictly under 10 lines of pristine syntax-highlighted code.',
    failReason: 'Classic developer ego trap: spent 4 months polishing micro-physics, custom syntax parsers, and sound effects for like buttons. Upon launch: developers just copied the code without leaving a single interaction.',
    lessons: 'Polish cannot save a product from lack of viral distribution mechanics. Code utility is consumed passively, not celebrated socially.',
    stack: ['React 19', 'Framer Motion', 'PrismJS', 'PostgreSQL', 'WebSockets'],
    epitaph: '“The smoothest 60fps animations for an empty auditorium.”',
  },
];
