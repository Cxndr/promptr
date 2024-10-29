import Link from 'next/link';
import { db } from '@/lib/db'; 

export default async function PromptsPage() {
  const prompts = await db.query('SELECT id, content FROM wg_prompts');

  return (
    <div>
      <h1>Available Prompts</h1>
      <ul>
        {prompts.rows.map((prompt) => (
          <li key={prompt.id}>
            <Link href={`/play/${prompt.id}`}>
              {prompt.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}