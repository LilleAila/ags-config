{
  stdenv,
  sass,
  esbuild,
  # Colorscheme, passed with .override
  colorScheme,
}:
stdenv.mkDerivation {
  src = ./.;
  name = "ags-config";

  nativeBuildInputs = [
    sass
    esbuild
  ];

  buildPhase =
    /*
    bash
    */
    with colorScheme.palette; ''
      mkdir -p style
      cat << EOF > ./style/cols.scss
      \$base00: #${base00};
      \$base01: #${base01};
      \$base02: #${base02};
      \$base03: #${base03};
      \$base04: #${base04};
      \$base05: #${base05};
      \$base06: #${base06};
      \$base07: #${base07};
      \$base08: #${base08};
      \$base09: #${base09};
      \$base0A: #${base0A};
      \$base0B: #${base0B};
      \$base0C: #${base0C};
      \$base0D: #${base0D};
      \$base0E: #${base0E};
      \$base0F: #${base0F};
      EOF

      sass ./style.scss ./style.css
      esbuild config.ts \
        --outfile=config.js \
        --bundle \
        --format=esm \
        --external:"resource://*" \
        --external:"gi://*"
    '';

  installPhase =
    /*
    bash
    */
    ''
      mkdir -p $out
      mkdir -p $out/bin
      cp -r * $out

      cat << EOF > $out/bin/ags-config
      ags -c $out/config.js
      EOF
      chmod +x $out/bin/ags-config
    '';
}
