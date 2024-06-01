{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  packages = with pkgs; [
    nil
    alejandra
    typescript
    nodePackages.typescript-language-server
    prettierd
    emmet-ls
    vscode-langservers-extracted
  ];
}
