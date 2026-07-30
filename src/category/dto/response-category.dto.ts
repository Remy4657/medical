export class CategoryResponseDto {
  id: number;
  name: string;
  slug: string;

  children: CategoryResponseDto[]; // Đệ quy cho cây
}
