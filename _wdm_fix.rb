# This file provides a workaround for the wdm issue on Ruby 3.4+
# It creates a dummy implementation of WDM to avoid dependency issues

if Gem.win_platform? && !Gem::Specification.find_all_by_name('wdm').any? && RUBY_VERSION >= '3.0'
  module WDM
    VERSION = '0.1.1'
    
    class Monitor
      def initialize
        @watches = []
      end
      
      def watch_recursively(directory, *args)
        @watches << directory
        self
      end
      
      def run!
        # Do nothing - just a dummy implementation
        sleep 1
      end
      
      def stop
        true
      end
    end
  end
end