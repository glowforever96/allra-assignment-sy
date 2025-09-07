interface BlogsBannerData {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
}

type Category = "TREND" | "TIP" | "NEWS" | "GUIDE" | "EXPERIENCE";
interface Blog {
  id: number;
  title: string;
  category: Category;
  thumbnail: string;
  showCount: number;
  createdAt: string;
  updatedAt: string;
}
interface BlogDetail extends Omit<Blog, "showCount"> {
  content: string;
  summary: string;
}

interface BlogResponse {
  list: Blog[];
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export type { BlogsBannerData, Blog, BlogResponse, BlogDetail, Category };
