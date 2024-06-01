{
  description = "A simple nix flake using flake-parts";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

    flake-parts.url = "github:hercules-ci/flake-parts";
    devshell.url = "github:numtide/devshell";
    devshell.inputs.nixpkgs.follows = "nixpkgs";

    nix-colors.url = "github:misterio77/nix-colors";
  };

  outputs = {...} @ inputs:
    inputs.flake-parts.lib.mkFlake {inherit inputs;} {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      imports = [
        inputs.devshell.flakeModule
      ];

      perSystem = {
        pkgs,
        system,
        lib,
        ...
      }: {
        devshells.default = {
          packages = with pkgs; [
            nil
            alejandra
            typescript
            nodePackages.typescript-language-server
            prettierd
            emmet-ls
            vscode-langservers-extracted
          ];
        };

        packages = rec {
          default = pkgs.callPackage ./package.nix {colorScheme = inputs.nix-colors.colorSchemes.gruvbox-dark-medium;};
          ags-config = default;
          ags = default;
        };
      };
    };
}
