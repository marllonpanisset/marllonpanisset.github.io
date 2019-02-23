# -*- mode: ruby -*-
# vi: set ft=ruby :
PROJECT_CODENAME = File.basename(Dir.getwd)
VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.box = "ubuntu/trusty32"
	config.vm.provision :shell, path: "bootstrap.sh", args: PROJECT_CODENAME
	config.vm.network :forwarded_port, host: 9000, guest: 9000
	config.vm.network "private_network", ip: "192.168.33.10"	
	config.vm.provider "virtualbox" do |v|
		v.memory = 2048
	end
end