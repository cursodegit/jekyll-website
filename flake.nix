{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "https://channels.nixos.org/nixpkgs-unstable/nixexprs.tar.zst";
    # Fixed nixpkgs snapshot used only for Ruby, so `nix flake update` keeps
    # Ruby at 4.0.9 while everything else follows nixpkgs-unstable.
    nixpkgs-ruby.url = "https://releases.nixos.org/nixpkgs/nixpkgs-26.11pre1118975.2074cc672349/nixexprs.tar.zst";
  };

  outputs = inputs: {
    devShells = builtins.mapAttrs (system: pkgs:
      let
        ruby = inputs.nixpkgs-ruby.legacyPackages.${system}.ruby_4_0;
      in
      assert toString ruby.version == "4.0.9";
      {
        default = pkgs.mkShell {
          packages = with pkgs; [
            git
            jujutsu
            pi-coding-agent
            ruby
            # Needed to build the rmagick gem (used by jekyll-responsive-image)
            pkg-config
            imagemagick
          ];
        };
      }) inputs.nixpkgs.legacyPackages;
  };
}
