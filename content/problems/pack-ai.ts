import { problem, type ProblemCard } from "./types";

export const PACK: Record<string, ProblemCard> = {
  tokens: problem(
    "You pasted a long article into a chat box. The model bills and reads in pieces, not words.",
    "About how many pieces is this, and will it fit?",
    "“unbelievable” may be 3 pieces. A 2,000-word post is often 2.5–4k pieces, not 2,000.",
    [
      "The model ignored the last page of my PDF. Why?",
      "Do we count words or something else?",
      "The system prompt is huge. Who pays?",
    ],
  ),
  "context-window": problem(
    "The model can only hold so many pieces at once: instructions, old chat, retrieved pages, and the answer.",
    "What do you keep when the box is full?",
    "8k box. System 1k, history 2k, retrieval 6k. You must cut. Newest question stays.",
    [
      "Chat has 40 turns and starts forgetting the start.",
      "We stuffed the whole schema in. Now retrieval does not fit.",
      "What do you evict first?",
    ],
  ),
  "prompt-as-spec": problem(
    "The bot must answer from notes only. If the notes do not have it, it must not guess.",
    "Write the contract: output shape and the refuse line.",
    "Notes about parking hours. User asks about refunds. Correct output: UNKNOWN.",
    [
      "Write the prompt like a spec, not a pep talk.",
      "How do you test it?",
      "Someone added “be helpful.” What broke?",
    ],
  ),
  temperature: problem(
    "The same extract-to-JSON prompt returns different keys each run.",
    "Which knob do you lock, and when would you turn it up?",
    "Temperature 0: same JSON. Temperature 1: extra fields appear. Fact path stays at 0.",
    [
      "The SQL keeps changing between runs.",
      "We need title ideas, not facts.",
      "Can we eval at temperature 1?",
    ],
  ),
  embeddings: problem(
    "“How do I reset my password?” and “forgot login” should find the same help page. The words do not match.",
    "Turn each sentence into a list of numbers so nearby meanings sit nearby.",
    "reset-password and forgot-login sit close. pizza sits far. You store the lists next to the page id.",
    [
      "Search that survives paraphrase.",
      "Can I mix two embedding models in one index?",
      "When is this worse than Ctrl+F?",
    ],
  ),
  "cosine-similarity": problem(
    "You have a question vector and many page vectors. Long pages should not win just for being long.",
    "Which pages point the same way as the question?",
    "Query [1, 0]. Page A [0.9, 0.1] beats page B [0, 1]. Direction, not length.",
    [
      "How do you rank chunks?",
      "Best score is 0.3. Do you still answer?",
      "Show the formula in JS.",
    ],
  ),
  "keyword-vs-vector": problem(
    "An analyst types “D7 retain.” A teammate types “players who came back after a week.”",
    "When do you need the exact token, and when do you need meaning?",
    "D7 retain → keyword on the glossary. The English sentence → vectors. Often both, then merge.",
    [
      "Ctrl+F misses the paraphrase.",
      "Vector search misses the metric name.",
      "How would you combine them?",
    ],
  ),
  chunking: problem(
    "The handbook is 80 pages. The model’s box is small. You must cut it into pages you can search.",
    "Where do you cut so a thought is not split in half?",
    "Split on headings. A table’s header stays with its rows. Overlap a little at the edges.",
    [
      "How do you split a markdown handbook?",
      "What metadata do you store on each piece?",
      "A table got split. What breaks?",
    ],
  ),
  "retrieve-then-read": problem(
    "Users ask questions about your notes. The notes are bigger than the window.",
    "Pick a few pages first. Answer only from those. Cite or say you do not know.",
    "Three chunks. Question matches chunk 2. Answer cites [2]. If none match: UNKNOWN.",
    [
      "Design a bot over our wiki.",
      "Why not dump the whole wiki in the prompt?",
      "How do you debug a wrong answer?",
    ],
  ),
  "stale-context": problem(
    "The FAQ changed yesterday. The search index still has last month’s answer. The bot is sure.",
    "How does a page update or delete reach the index?",
    "Publish → delete old ids → write new chunks → embed. Or the answer must say “as of June.”",
    [
      "We updated the policy. The bot still cites the old one.",
      "Treat the index like what?",
      "What if we cannot reindex live?",
    ],
  ),
  "function-calling": problem(
    "The user asks “what is 2+3?” You do not want the model to guess arithmetic. You have add(a, b) in JS.",
    "The model should name the function and the args. Your code runs. Then it speaks.",
    "Model returns add({a:2,b:3}). JS returns 5. Final sentence uses 5. It does not invent 6.",
    [
      "The model needs live revenue. How?",
      "Who is the source of truth — the model or your function?",
      "What if the args are garbage?",
    ],
  ),
  hallucination: problem(
    "The notes are about parking. The user asks about refunds. The bot writes a fluent refund policy.",
    "Stop the fluent lie. What should it say instead?",
    "Correct: UNKNOWN. A citation is required when it does answer.",
    [
      "It sounds sure and is wrong.",
      "How do you test the missing-info case?",
      "“Be helpful” broke the refuse. Why?",
    ],
  ),
  "golden-eval": problem(
    "You changed one line of the prompt. You need to know if the bot got worse before users do.",
    "A short list of questions with the facts you will accept. Pass or fail.",
    "10 items. Two must be UNKNOWN. A prompt that fails an old pass does not ship.",
    [
      "How do you know a prompt change is safe?",
      "What does one eval row look like?",
      "Show me a table, not a chat screenshot.",
    ],
  ),
  "text-to-sql": problem(
    "“Top game by revenue yesterday.” You have a warehouse. The model can write SQL. It can also write DROP.",
    "Turn English into a query you would actually run — after a check.",
    "SELECT game, SUM(revenue) … WHERE day = yesterday. Reject anything that is not SELECT. Need a date filter.",
    [
      "Analysts want English over BigQuery.",
      "Who runs the SQL — the model or your service?",
      "What do you retrieve before you generate?",
    ],
  ),
  "cost-latency": problem(
    "The same correct answer: one call stuffed 8k of notes, another used 800. The bill and the wait changed.",
    "What do you log, what do you cache, what do you cut?",
    "Log tokens in, tokens out, ms. Cache the system prompt. Cap output length.",
    [
      "This feature is right but too slow and too expensive.",
      "Where is the money — input or output?",
      "What do you cache?",
    ],
  ),
  "pii-in-prompts": problem(
    "A support ticket has an email and a phone. Someone pastes it into the model to summarize.",
    "What do you strip before the model and before the log?",
    "Replace the email and phone. Keep “adult user, billing issue.” The vendor is another copy.",
    [
      "Can we paste tickets into the model?",
      "What do you redact?",
      "What do you keep in traces?",
    ],
  ),
  "analytics-qa-design": problem(
    "Analysts ask English. The warehouse is BigQuery. A wrong number can move spend.",
    "Sketch v1: who owns the metric, how SQL is checked, when a human must approve.",
    "v1 is one domain (revenue), a certified glossary, generate → validate → run, 10 golden questions. Not six agents.",
    [
      "Design Q&A over our analytics.",
      "What is v1 vs v2?",
      "Two metrics disagree. What do you do?",
    ],
  ),
};
