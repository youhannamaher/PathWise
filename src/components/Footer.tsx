export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built for the future. <span className="font-semibold text-primary">PathWise</span> © {new Date().getFullYear()}
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          Built by{" "}
          <a 
            href="https://youhannamaher.github.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            Youhanna Maher
          </a>
        </p>
      </div>
    </footer>
  );
}
