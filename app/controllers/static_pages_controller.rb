class StaticPagesController < ActionController::Base # we changed inheritance chain so it can render HTML

    # we defined one endpoint for frontend, serving up the index.html file
    def frontend
        render file: Rails.root.join('public', 'index.html')
    end

end
