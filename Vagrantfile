# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty32"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network :forwarded_port, host: 3000, guest: 3000
  config.vm.provision :shell, path: "vm_resources/frontend.sh"
  config.vm.provider "virtualbox" do |v|
    v.memory = 1024
  end
end