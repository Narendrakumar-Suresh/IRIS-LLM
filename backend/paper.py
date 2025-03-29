import arxiv


def fetch_arxiv_papers(query, max_results=5):
    client = arxiv.Client()
    search = arxiv.Search(
        query=query,
        max_results=max_results,
        sort_by=arxiv.SortCriterion.Relevance
    )

    papers = []
    for result in client.results(search):
        papers.append({
            "title": result.title,
            "authors": [author.name for author in result.authors],
            "summary": result.summary,
            "pdf_link": result.pdf_url
        })

    return papers


# Example Usage
papers = fetch_arxiv_papers("Quantum mechanics")
for paper in papers:
    print(
        f"🔹 {paper['title']}\n👨‍🏫 Authors: {', '.join(paper['authors'])}\n📎 PDF: {paper['pdf_link']}\n📝 {paper['summary'][:200]}...\n")
