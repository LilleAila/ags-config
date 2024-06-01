{
  description = "A simple nix flake using flake-parts";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    nix-colors.url = "github:misterio77/nix-colors";
  };

  outputs = {nixpkgs, ...} @ inputs: let
    systems = [
      "x86_64-linux"
      "aarch64-linux"
    ];
    pkgsFor = nixpkgs.lib.genAttrs systems (
      system:
        import nixpkgs {
          inherit system;
        }
    );
    forEachSystem = f: nixpkgs.lib.genAttrs systems (system: f pkgsFor.${system});
  in {
    packages = forEachSystem (pkgs: rec {
      default = pkgs.callPackage ./package.nix {colorScheme = inputs.nix-colors.colorSchemes.gruvbox-dark-medium;};
      ags-config = default;
      ags = default;
    });
    devShells = forEachSystem (pkgs: {default = import ./shell.nix {inherit pkgs;};});
  };
}
