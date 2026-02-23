import { TechChip } from './TechChip';

type Category = {
  title: string;
  items: readonly string[];
};

type Props = {
  categories: readonly Category[];
};

export const TechCategories = ({ categories }: Props) => {
  return (
    <div className="mt-6 p-4 rounded-lg bg-base-100 border border-base-200">
      <h3 className="text-sm font-semibold mb-3">Stack</h3>

      <div className="grid grid-cols-1 gap-4">
        {categories.map((cat) => (
          <div key={cat.title}>
            <h4 className="text-xs font-medium text-muted mb-2">{cat.title}</h4>

            <ul role="list" className="flex flex-wrap gap-2">
              {cat.items.map((tech) => (
                <li key={tech}>
                  <TechChip name={tech} showIcon={false} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
